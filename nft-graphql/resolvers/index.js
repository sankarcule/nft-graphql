const {NFT} = require('../models/index')
const {withFilter} = require("apollo-server/dist")

module.exports = {
    Query: {
        getAllNfts: async(_, args) => {
            const nfts = await NFT.find()
            return nfts
        }
    },
    Mutation: {
        addNft: async(_, args) => {
            const nft = new NFT()
            nft.save(args.input)
            return nft
        },

        updateNft: async(_, args, {pubsub}) => {
            const nft = await NFT.findOneAndUpdate({nftId: args.input.nftId}, args.input)
            pubsub.publish("NFT_UPDATED",{
                onNFTPurchase: nft
            })
            return nft
        }
    },
    Subscription:{
        onNFTPurchase: {
            subscribe: withFilter(
                (_, args, {pubsub}) => {
                    return pubsub.asyncIterator("NFT_UPDATED")
                },
                (argsFromMutation, argsFromFrontend) =>{
                   // console.log("argsFromMutation.onNFTPurchase.nftId",argsFromMutation.onNFTPurchase,argsFromFrontend.nftId );
                    return argsFromMutation.onNFTPurchase.nftId === argsFromFrontend.nftId
                }

            )
        }
    }
}