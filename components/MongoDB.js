import { Stitch, ServerApiKeyCredential, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
export default class MongoDB {
  constructor(){
    this.appId = 'spontic-tntxq';
    this.dbName = 'spontic';
  }

  async init(){
    const apiKey = 'RQ1fWTf8pt4etIVBX6igRVw4derxviPBwqXKbyU8G9ZR0VTjJaPGHmhv65a7xO2u';
    Stitch.clearApps();
    const that = this;
    let ret = false;
    await Stitch.initializeAppClient(this.appId).then(async function(client){
      await client.auth
        .loginWithCredential(new ServerApiKeyCredential(apiKey, 'api-key'))
        .then(user => {
          that.stitchAppClient = Stitch.getAppClient(that.appId);
          if(!that.mongoClient) {
            that.mongoClient = that.stitchAppClient.getServiceClient(
              RemoteMongoClient.factory,
              "mongodb-atlas"
            );
          }
          ret = true;
        })
        .catch(err => {
          console.error(err);
          ret = false;
        });
    });
    return ret;
  }

  async push(collection,id,data){
    if(!this.stitchAppClient && !await this.init()) {
      return;
    }
    const db = this.mongoClient.db(this.dbName);
    const collection_ = db.collection(collection);
    let ret;
    await collection_
      .updateOne(
        {id : id},
        { $push : data},
        {upsert:true}
      )
      .then(() => {
        ret = true;
      })
      .catch(err => {
        console.error(err);
      });
    return ret;
  }

  async upsert(collection,id,data){
    if(!this.stitchAppClient && !await this.init()) {
      return;
    }
    const db = this.mongoClient.db(this.dbName);
    const collection_ = db.collection(collection);
    let ret;
    await collection_
      .updateOne(
        {id : id},
        { $set : data},
        {upsert:true}
      )
      .then(() => {
        ret = true;
      })
      .catch(err => {
        console.error(err);
      });
    return ret;
  }

  async get(collection,id,projection){
    if(!this.stitchAppClient && !await this.init()){
      return;
    }
    const db = this.mongoClient.db(this.dbName);
    const collection_ = db.collection(collection);
    let ret;
    let options = { sort: { date: -1 } };
    if(projection){
      options.projection = projection;
    }
    await collection_
      .find({ id: id }, options)
      .asArray()
      .then(docs => {
        ret = docs.length > 0 ? docs : null;
      })
      .catch(err => {
        console.error(err);
      });
    return ret;
  }
}
