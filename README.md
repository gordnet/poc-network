# GordNet
GordNet is a decentralized trustless minimal-knowledge network that acts as a relay between two communicating parties via HTTP/HTTPS protocols. Currently, when a user attempts to send a request to some website, the users' data or actions online are not private and that information can be easily tracked and intercepted by a third party such as the government, hacker etc. Projects like Tor and I2P attempt to obfuscate the path between a user and his/her destination. However, there are still issues with projects such as Tor which opens the room for a more robust solution. A major problem with current solutions such as Tor is the lack of nodes due partially to the lack of incentive of being a relay resulting in a poor user experience or even a low robust obfuscation of the path between a user and destination.

# Impact of GordNet
GordNet aims to be a better alternate to Tor like projects. First, Gordnet aims to be a completely decentralized network which makes the obfuscating the path between a user and the end destination more efficient and secure. It also is a faster network because the market determines the price of privacy. Hence, the more reward a relay receives, the faster the network will be. The link to the complete whitepaper can be obtained here: https://github.com/gordnet/docs/blob/main/WHITEPAPER.md

# Guidelines
GordNet is constantly working on improving its code base to provide the best decentralized network for online privacy. As a result, code changes and bug fixes are being constantly delivered. Developers should follow the best practices for contributing to this project which can be found in the CONTRIBUTING.md file.


# JSON-RPC

The JSON-RPC protocol is a lightweight mechanism for communication between a client and a server. We listen for JSON-RPC requests at port `20309` by default, but this can be overridden by setting the `--rpcport` flag.
