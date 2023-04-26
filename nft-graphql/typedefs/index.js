const {gql} = require('apollo-server')

const typeDefs = gql`
type Nft {
    name: String
    price: Float
    priceType: String
    ownedBy: String
    createdBy: String
    tokenId: String
    collectionId: String
    imgUrl: String
    nftId: String
}

input addNft {
    name: String
    price: Float
    priceType: String
    ownedBy: String
    createdBy: String
    tokenId: String
    collectionId: String
    imgUrl: String
    nftId: String
}

input updateNft {
    name: String
    price: Float
    priceType: String
    ownedBy: String
    createdBy: String
    tokenId: String
    collectionId: String
    imgUrl: String
    nftId: String
}


type successResponse {
    message: String
    code: String
}


type Query {
    getAllNfts: [Nft]
    getNftOfUser(userId: String): [Nft] 
}

type Mutation {
    addNft(input: addNft): successResponse
    updateNft(input: updateNft): Nft
}

type Subscription {
    onNFTPurchase(nftId: String): Nft
}
`

module.exports = typeDefs