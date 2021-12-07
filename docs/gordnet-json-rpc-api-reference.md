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

| Name                  | Type      | Constraints | Description                               |
| --------------------- | --------- | ----------- | ----------------------------------------- |
| result                | array     |             |                                           |
| result[]              | object    |             |                                           |
| result[]?.ip          | string    |             | IP address of the peer                    |
| result[]?.port        | integer   |             | Port of the peer                          |
| result[]?.connectedAt | timestamp |             | Date and time when the peer was connected |

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
  "id": "1234567890"
}
```
