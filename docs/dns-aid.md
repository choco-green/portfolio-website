# DNS for AI Discovery

Publish the DNS-AID organization index in the public `justinfung.com` DNS zone.

```dns
_index._agents.justinfung.com. 3600 IN SVCB 1 justinfung.com. mandatory=alpn,port alpn=h2 port=443 key65280="/.well-known/agent-skills/index.json"
_index._agents.justinfung.com. 3600 IN HTTPS 1 justinfung.com. mandatory=alpn,port alpn=h2 port=443 key65280="/.well-known/agent-skills/index.json"
```

The SVCB and HTTPS records both point to the existing HTTPS origin and advertise HTTP/2 on port 443. `key65280` is a private-use SvcParamKey for the DNS-AID draft `well-known` parameter until the draft receives an IANA assignment. Its value points consumers at the already-published agent skills index.

Enable DNSSEC for the `justinfung.com` zone after publishing the records. The DNS-AID scanner checks the DNS records through DNS-over-HTTPS and reports whether the resolver returned authenticated data.

Validate publication:

```sh
dig +dnssec _index._agents.justinfung.com TYPE64
dig +dnssec _index._agents.justinfung.com TYPE65
curl -L -H "Content-Type: application/json" \
  --data '{"url":"https://justinfung.com"}' \
  https://isitagentready.com/api/scan
```

The scanner's `checks.discoverability.dnsAid.status` should be `pass`.
