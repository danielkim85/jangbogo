import { Stitch, ServerApiKeyCredential, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
export default class MongoDB {
  constructor(){
    this.appId = 'spontic-tntxq';
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

  async upsertUser(data){
    if(!this.stitchAppClient && !await this.init()){
      return;
    }
    const db = this.mongoClient.db("spontic");
    const users = db.collection("users");
    let ret;
    await users
      .updateOne(
        {id : data.id},
        { $set : data}
      )
      .then(() => {
        ret = true;
      })
      .catch(err => {
        console.error(err);
      });
    return ret;
  }

  async getUser(userId){
    if(!this.stitchAppClient && !await this.init()){
      return;
    }
    const db = this.mongoClient.db("spontic");
    const users = db.collection("users");
    let ret;
    await users
      .find({ id: userId }, { sort: { date: -1 } })
      .asArray()
      .then(docs => {
        ret = docs.length > 0 ? docs[0] : null;
      })
      .catch(err => {
        console.error(err);
      });
    return ret;
  }
}
