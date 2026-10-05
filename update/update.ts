import * as fs from 'fs';

const fileLocation = '../list.go';
const pageUrl = 'https://knowledge.hubspot.com/forms/what-domains-are-blocked-when-using-the-forms-email-domains-to-block-feature';

void (async () => {
  const page = await fetch(pageUrl, { headers: { 'user-agent': 'Mozilla/5.0' } });
  if (!page.ok) throw new Error(`Failed to fetch page: ${page.status}`);

  const html = await page.text();
  const link = html.match(/<a\b[^>]*href="([^"]+\.csv)"[^>]*>\s*download a csv file\s*<\/a>/i)?.[1];
  if (!link) throw new Error('CSV link not found');

  const response = await fetch(link);
  if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.status}`);

  const text = await response.text();
  const array = text.split(/[,\n\r]+/g).filter(x => x.length > 0).map(x => `"${x}"`).join(', ');
  const data = `package freeemails\n\nvar Domains = []string{${array}}\n`;

  if (data.length < 100) throw new Error('Domain count too low');

  if (fs.readFileSync(fileLocation, 'utf8') !== data) {
    fs.writeFileSync(fileLocation, data);
  }
})();
