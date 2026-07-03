#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ZenOfDoomSiteStack } from '../lib/site-stack';
import { ZenOfDoomCertificateStack } from '../lib/certificate-stack';

const app = new cdk.App();

const account = process.env.CDK_DEFAULT_ACCOUNT || '238602380102';
const domain = 'zenofdoom.sauhsoj.wtf';
const hostedZoneName = 'sauhsoj.wtf';

// Certificate stack in us-east-1 (required for CloudFront)
const certStack = new ZenOfDoomCertificateStack(app, 'ZenOfDoomCertificateStack', {
  env: { account, region: 'us-east-1' },
  crossRegionReferences: true,
  domain,
  hostedZoneName,
});

// Main stack in ap-southeast-4 (Melbourne) — matches blog-sauhsoj-wtf / me-sauhsoj-wtf
new ZenOfDoomSiteStack(app, 'ZenOfDoomSiteStack', {
  env: { account, region: 'ap-southeast-4' },
  crossRegionReferences: true,
  domain,
  hostedZoneName,
  certificate: certStack.certificate,
});
