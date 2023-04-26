const mongoose = require('mongoose')
const { Schema } = mongoose

const NftSchema = new Schema({
    nftId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    tokenId: {
        type: String,
        required: true
    },
    collectionId: {
        type: String,
        required: true
    }
})

const NFT = mongoose.model('Nft', NftSchema)
module.exports = {
    NFT
}