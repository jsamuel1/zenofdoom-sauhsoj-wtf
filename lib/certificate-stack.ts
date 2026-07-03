import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

export interface ZenOfDoomCertificateStackProps extends cdk.StackProps {
  domain: string;
  hostedZoneName: string;
}

// CloudFront requires the certificate to live in us-east-1 regardless of
// where the distribution's origin resources are deployed, hence the
// dedicated stack (see bin/zenofdoom.ts for the cross-region wiring).
export class ZenOfDoomCertificateStack extends cdk.Stack {
  public readonly certificate: acm.ICertificate;

  constructor(scope: Construct, id: string, props: ZenOfDoomCertificateStackProps) {
    super(scope, id, props);

    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: props.hostedZoneName,
    });

    this.certificate = new acm.Certificate(this, 'Certificate', {
      domainName: props.domain,
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });
  }
}
