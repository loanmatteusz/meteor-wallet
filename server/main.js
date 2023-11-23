// import { Meteor } from 'meteor/meteor';

import "/imports/api/modules/contact/infra/collections";
import "/imports/api/modules/contact/infra/methods";
import "/imports/api/modules/contact/infra/publications";

import "/imports/api/modules/transaction/infra/collections";
import "/imports/api/modules/transaction/infra/methods";

import "/imports/api/modules/wallet/infra/collections";
import "/imports/api/modules/wallet/infra/publications";

import "/imports/api/modules/role/infra/methods";

import "/infra/CustomError";
import "/infra/accounts";
import "/infra/roles";


// import { WalletCollection } from "/imports/api/modules/wallet/infra/collections/WalletCollection";


// Meteor.startup(async () => {
//   console.log(`Meteor Project "Meteor Wallet" is running!`);
//   if (!WalletCollection.find().count()) {
//       WalletCollection.insert({
//           createdAt: new Date(),
//       });
//   }
// });
