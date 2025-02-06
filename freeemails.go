package freeemails

import (
	"slices"
	"strings"
)

func IsFreeDomain(email string) bool {
	if !strings.Contains(email, "@") {
		return false
	}

	parts := strings.Split(email, "@")
	if len(parts) != 2 {
		return false
	}

	emailDomain := strings.ToLower(parts[1])
	domainParts := strings.Split(emailDomain, ".")

	for i := 0; i < len(domainParts)-1; i++ {
		parentDomain := strings.Join(domainParts[i:], ".")

		if slices.Contains(Domains, parentDomain) {
			return true
		}
	}

	return false
}
