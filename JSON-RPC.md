Gordnet API call list (as of version 0.1.0)

Common operations
-----------------

### Listing my bitcoin addresses

Listing the bitcoin [addresses](address "wikilink") in your wallet is
easily done via *listreceivedbyaddress*. It normally lists only
addresses which already have received transactions, however you can list
all the addresses by setting the first argument to 0, and the second one
to true.

[Accounts](accounts_explained "wikilink") are used to organize
addresses.

Full list
---------

Required arguments are denoted inside &lt; and &gt; Optional arguments
are inside \[ and \].

|       Command        	|                     Parameters                     	|                                                                                                       Description                                                                                                        	|
|:--------------------:	|:--------------------------------------------------:	|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:	|
| addPeer   	|      <host:path>       	| Gets the peers that the node is connected to  	|
| getPeers   	|             	| Gets the peers that the node is connected to  	|
| addnode              	| <node> <add/remove/onetry>                         	| version 0.8 Attempts add or remove <node> from the addnode list or try a connection to <node> once.                                                                                                                      	|
| backupwallet         	| <destination>                                      	| Safely copies wallet.dat to destination, which can be a directory or a path with filename.                                                                                                                               	|
| createmultisig       	| <nrequired> <'["key,"key"]'>                       	| Creates a multi-signature address and returns a json object                                                                                                                                                              	|
| createrawtransaction 	| [{"txid":txid,"vout":n},...] {address:amount,...}  	| version 0.7 Creates a raw transaction spending given inputs.                                                                                                                                                             	|
| decoderawtransaction 	| <hex string>                                       	| version 0.7 Produces a human-readable JSON object for a raw transaction.                                                                                                                                                 	|

Error Codes
-----------

See
[docs/JSON-RPC-ERROR-CODES.md](docs/JSON-RPC-ERROR-CODES.md) for the list of error codes and their meanings.
