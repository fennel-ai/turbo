import React from "react";
import { MjmlColumn, MjmlSection, MjmlSpacer, MjmlWrapper } from "@faire/mjml-react";
import BaseLayout from "./components/BaseLayout";
import Button from "./components/Button";
import Link from "./components/Link";
import Footer from "./components/Footer";
import Heading from "./components/Heading";
import Header from "./components/Header";
import Text from "./components/Text";
import { fontSize, colors, spacing, fontFamily, screens } from "./theme";

const welcomeStyle = `
  .h1 > * {
    font-size: 56px !important;
	font-variation-settings: "wght" 400;
  }

  .h1 b {
	font-variation-settings: "wght" 600;
  }

  .h2 > * {
    font-size: ${fontSize.lg}px !important;
  }
  .item > * {
    font-size: ${fontSize.base}px !important;
	font-variation-settings: "wght" 600;
  }

  .item span {
	opacity: 0.72;
	font-variation-settings: "wght" 400;
  }

  @media (min-width:${screens.xs}) {
    .h1 > * {
      font-size: 84px !important;
    }
    .h2 > * {
      font-size: ${fontSize.xxl}px !important;
    }
    .item > * {
      font-size: ${fontSize.md}px !important;
    }
  }
`;

type RequestADemoInternalProps = {
  name: string,
  email: string,
  role: string,
};

const RequestADemoInternal = ({ name, email, role }: RequestADemoInternalProps) => {
  return (
    <BaseLayout width={600} style={welcomeStyle}>
      <Header />
      <MjmlWrapper backgroundColor={colors.black}>
        <MjmlSection paddingBottom={spacing.s11} cssClass="gutter">
          <MjmlColumn>
            <Heading cssClass="h2" paddingBottom={spacing.s6}>
              New Demo Request Received!
            </Heading>
            <Text
              cssClass="item"
              fontSize={fontSize.md}
            >
				<span>Name:</span> {name}
            </Text>
			<Text
				cssClass="item"

				fontSize={fontSize.md}
			>
				<span>Email:</span> <Link href={`mailto:${email}`}>{email}</Link>
			</Text>
            <Text
              cssClass="item"
              fontSize={fontSize.md}
              paddingBottom={spacing.s7}
            >
				<span>Role:</span> {role}
            </Text>

            <Button
              href={`mailto:${email}`}
              backgroundColor={colors.green300}
              align="left"
			  width={'100%'}
              cssClass="sm-hidden"
            >
              	Reply to {name}
				<span style={{ marginLeft: 8, fontFamily: fontFamily.serif }}>&rarr;</span>
            </Button>
            <MjmlSpacer height={spacing.s3} cssClass="lg-hidden" />
            <Button
              href={`mailto:${email}`}
              backgroundColor={colors.green300}
              align="right"
              cssClass="lg-hidden"
            >
             	Reply to {name}
				<span style={{ marginLeft: 8, fontFamily: fontFamily.serif }}>&rarr;</span>
            </Button>
          </MjmlColumn>
        </MjmlSection>
      </MjmlWrapper>
    </BaseLayout>
  );
};
RequestADemoInternal.subject = "Thank you for installing Mailing :)";
export default RequestADemoInternal;
