# Gordnet JSON-RPC API

Gordnet API call list
This API follows the json-rpc 2.0 specification. More information available at http://www.jsonrpc.org/specification.

<strong>Version 1.0</strong>

---

- [peers.get](#peers.get)
- [peers.add](#peers.add)

---

<a name="peers.get"></a>

## peers.get

Gets the peers that the node is connected to

### Description

Authenticates the user using the provided credentials and creates a new session.

### Result

<<<<<<< HEAD
| Name                  | Type      | Constraints | Description                           |
| --------------------- | --------- | ----------- | ------------------------------------- |
| result                | array     |             |                                       |
| result[]              | object    |             |                                       |
| result[]?.ip          | string    |             | IP address of the peer                |
| result[]?.port        | integer   |             | Port of the peer                      |
| result[]?.connectedAt | timestamp |             | Timestamp when the peer was connected |
=======
| Name                  | Type      | Constraints | Description                               |
| --------------------- | --------- | ----------- | ----------------------------------------- |
| result                | array     |             |                                           |
| result[]              | object    |             |                                           |
| result[]?.ip          | string    |             | IP address of the peer                    |
| result[]?.port        | integer   |             | Port of the peer                          |
| result[]?.connectedAt | timestamp |             | Date and time when the peer was connected |
>>>>>>> 0684895c97fa485c3318821f3cdfad19bc3716f6

### Examples

#### Request

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "method": "peers.get"
}
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "result": [{}]
}
```

<a name="peers.add"></a>

## peers.add

Adds a new peer to the node

<<<<<<< HEAD
### Description

Checks the connection with a peer and adds it to the node if it is valid.

### Result

| Name                | Type      | Constraints | Description                           |
| ------------------- | --------- | ----------- | ------------------------------------- |
| result              | object    |             |                                       |
| result?.ip          | string    |             | IP address of the peer                |
| result?.port        | integer   |             | Port of the peer                      |
| result?.connectedAt | timestamp |             | Timestamp when the peer was connected |

=======
>>>>>>> 0684895c97fa485c3318821f3cdfad19bc3716f6
### Examples

#### Request

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "method": "peers.add"
}
```

#### Response

```json
{
  "jsonrpc": "2.0",
<<<<<<< HEAD
  "id": "1234567890",
  "result": {}
=======
  "id": "1234567890"
>>>>>>> 0684895c97fa485c3318821f3cdfad19bc3716f6
}
```
