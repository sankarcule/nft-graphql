const { ApolloServer, PubSub } = require("apollo-server")
const typeDefs = require("./typedefs")
const resolvers = require("./resolvers")
const mongoose = require('mongoose')

mongoose
    .connect(`mongodb+srv://testuser:1q2w3e@cluster0.kayhdm2.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log('MongoDB connected successfully')
    })
    .catch(() => {
        console.error('Error while connecting to MongoDB');
    })

const pubsub = new PubSub()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {

        return {
            req,
            res,
            pubsub
        }
    }
})

server.listen(8002).then(({ url, subscriptionsUrl }) => {
    console.log('server running on', url, subscriptionsUrl)
})