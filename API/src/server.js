import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { MongoClient, ObjectId } from "mongodb";
import { GraphQLScalarType, Kind } from "graphql";
import dotenv from "dotenv";

dotenv.config();

let db;

// Connect to MongoDB
async function connectDB() {
  try {
    const client = new MongoClient(process.env.DATABASE);
    await client.connect();
    console.log("Connected to database!");
    db = client.db();
  } catch (error) {
    console.log("Error connecting to database:", error);
  }
}

// Custom GraphQL Date Scalar
const GraphQLDate = new GraphQLScalarType({
  name: "GraphQLDate",
  description: "Custom date scalar type",
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

const typeDefs = `
  scalar GraphQLDate

  type Employee {
    id: ID!
    firstname: String!
    lastname: String!
    age: Int!
    dateOfJoining: GraphQLDate!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Int!
  }

  input EmployeeInput {
    firstname: String!
    lastname: String!
    age: Int!
    dateOfJoining: GraphQLDate!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Int!
  }

  input EmployeeUpdateInput {
    title: String
    department: String
    currentStatus: Int
  }

  type Query {
    list: [Employee]
    getEmployee(id: ID!): Employee
  }

  type Mutation {
    createEmployee(input: EmployeeInput!): Employee
    updateEmployee(id: ID!, input: EmployeeUpdateInput!): Employee
    deleteEmployee(id: ID!): Boolean
  }
`;

const resolvers = {
  GraphQLDate,
  Query: {
    list: async () => {
      const employeesFromDB = await db.collection("employees").find().toArray();
      return employeesFromDB.map((employee) => ({
        ...employee,
        id: employee._id.toString(),
      }));
    },
    getEmployee: async (_, { id }) => {
      const employee = await db
        .collection("employees")
        .findOne({ _id: new ObjectId(id) });
      return {
        ...employee,
        id: employee._id.toString(),
      };
    },
  },
  Mutation: {
    createEmployee: async (_, { input }) => {
      const result = await db.collection("employees").insertOne(input);
      const insertedEmployee = await db
        .collection("employees")
        .findOne({ _id: result.insertedId });
      return {
        ...insertedEmployee,
        id: insertedEmployee._id.toString(),
      };
    },
    updateEmployee: async (_, { id, input }) => {
      await db
        .collection("employees")
        .updateOne({ _id: new ObjectId(id) }, { $set: input });
      const updatedEmployee = await db
        .collection("employees")
        .findOne({ _id: new ObjectId(id) });
      return {
        ...updatedEmployee,
        id: updatedEmployee._id.toString(),
      };
    },
    deleteEmployee: async (_, { id }) => {
      const result = await db
        .collection("employees")
        .deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

// Connect to the database
connectDB();
