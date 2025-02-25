import getPayload from "@/db/payload"
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"
import { render } from "@react-email/render"

type LoginLinkSendProps = {
  email: string
  url: URL
}

export const send = async ({ email, url }: LoginLinkSendProps) => {
  const html = await render(<LoginLinkEmail url={url} />, { pretty: true })
  const payload = await getPayload()
  await payload.sendEmail({
    to: email,
    subject: "Login link: Learn Payload with Colyn",
    html,
  })
}

export const LoginLinkEmail = ({ url }: { url: URL }) => {
  return (
    <Tailwind config={{ theme: { extend: { colors: { brand: "#3D9D9F" } } } }}>
      <Html>
        <Head />
        <Body className="font-sans bg-zinc-50 box-border p-6">
          <Preview>Your login link for Learn Payload (with Colyn)</Preview>
          <Container className="box-border bg-white rounded-md p-6">
            <Img
              src={`https://learnpayload.nyc3.cdn.digitaloceanspaces.com/logos/main-light2.png`}
              width="584"
              height="215"
              alt="LearnPayload"
              className="h-20 w-[200px] object-contain"
            />
            <Heading className="text-black text-xl font-normal">
              Your login link for Learn Payload
            </Heading>
            <Section>
              <Button
                className="bg-brand text-white py-4 text-2xl font-semibold text-center rounded w-full"
                href={url.toString()}
              >
                Login to Learn Payload
              </Button>
            </Section>
            <Text className="p-0 py-2 m-0 opacity-40">
              This link will only be valid for the next 15 minutes.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}
