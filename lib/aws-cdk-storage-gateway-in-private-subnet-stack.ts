import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkStorageGatewayInPrivateSubnetStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPCを作成
    const vpc = new cdk.aws_ec2.Vpc(this, 'VPC', {
      maxAzs: 2,
    });

    // private subnetを取得
    const privateSubnets = vpc.privateSubnets;

    // pirvate subnetにEC2インスタンスを作成
    const ec2 = new cdk.aws_ec2.Instance(this, 'Instance', {
      vpc,
      instanceType: new cdk.aws_ec2.InstanceType('t2.micro'),
      machineImage: new cdk.aws_ec2.AmazonLinuxImage(),
      vpcSubnets: {
        subnets: privateSubnets,
      },
    });

    // private subnetにStorage Gateway用のEC2インスタンスを作成
    const storageGatewayEc2 = new cdk.aws_ec2.Instance(this, 'StorageGatewayInstance', {
      vpc,
      instanceType: new cdk.aws_ec2.InstanceType('i4i.large'),
      machineImage: new cdk.aws_ec2.AmazonLinuxImage(),
      vpcSubnets: {
        subnets: privateSubnets,
      },
    });
  }
}
