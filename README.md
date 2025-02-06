# free-email-domains-go

A list of free email domains provided by [`hubspot`](https://knowledge.hubspot.com/forms/what-domains-are-blocked-when-using-the-forms-email-domains-to-block-feature)

## Installation

```bash
go get github.com/fast-facts/free-email-domains-go
```

## Quick Start

```go
import (
 freeemails "github.com/fast-facts/free-email-domains-go"
)

func main() {
 domains := freeemails.Domains
 domains := freeemails.IsFreeDomain("test@subdomain.domain.com") // checks both subdomain.domain.com and domain.com
}
```
