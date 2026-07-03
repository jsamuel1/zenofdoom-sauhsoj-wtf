# zenofdoom-sauhsoj-wtf

Static site + infra for **zenofdoom.sauhsoj.wtf** — the companion site for
[Zen Word of Doom](https://github.com/jsamuel1/ZenWordOfDoom), currently
hosting the app's privacy policy.

Mirrors the `blog-sauhsoj-wtf` / `me-sauhsoj-wtf` infra pattern: a CDK stack
in `us-east-1` for the ACM certificate (required by CloudFront), and a main
stack in `ap-southeast-4` for the S3 bucket (private, Origin Access Control
only), CloudFront distribution, and the Route53 alias record in the
`sauhsoj.wtf` hosted zone.

## Structure

- `bin/zenofdoom.ts` — CDK app entry point
- `lib/certificate-stack.ts` — ACM certificate (us-east-1)
- `lib/site-stack.ts` — S3 + CloudFront + Route53 (ap-southeast-4)
- `site/` — static site content, deployed via `BucketDeployment`

## Deploy

```bash
npm install
npx cdk deploy --all --require-approval never
```

Content changes under `site/` are picked up automatically on the next
`cdk deploy` (via the `BucketDeployment` construct), which also invalidates
the CloudFront distribution.
