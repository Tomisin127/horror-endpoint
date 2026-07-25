import { type NextRequest, NextResponse } from "next/server"
import { withX402 } from "@x402/next"
import { BUILDER_CODE as BUILDER_CODE_KEY, declareBuilderCodeExtension } from "@x402/extensions/builder-code"
import { declareDiscoveryExtension } from "@x402/extensions/bazaar"
import { resourceServer, BASE_MAINNET, PAY_TO_ADDRESS, PRICE, BUILDER_CODE } from "@/lib/x402"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * The actual fulfillment. This only runs after the x402 payment has been
 * verified and settled on Base mainnet, so we can safely hand over the resource.
 */
async function handler(_request: NextRequest) {
  return NextResponse.json({
    title: "The Horror Story Collection",
    stories: [
      {
        id: 1,
        title: "The Whispers in the Walls",
        excerpt:
          "In the silence of midnight, the walls began to whisper secrets that should have remained buried...",
      },
      {
        id: 2,
        title: "Eyes in the Mirror",
        excerpt:
          "She noticed something wrong with her reflection one fateful evening. It was watching her.",
      },
      {
        id: 3,
        title: "The Last Passenger",
        excerpt:
          "The bus driver wondered why that same passenger rode every night, never aging, never changing...",
      },
    ],
    license: "Single-reader license. Do not redistribute.",
    purchasedAt: new Date().toISOString(),
  })
}

export const GET = withX402(
  handler,
  {
    accepts: {
      scheme: "exact",
      network: BASE_MAINNET,
      payTo: PAY_TO_ADDRESS,
      price: PRICE,
    },
    description: "Access the exclusive horror story collection (pay-per-read).",
    mimeType: "application/json",
    serviceName: "Horror Story API",
    tags: ["horror", "stories", "fiction", "entertainment"],
    // ERC-8021 Builder Code attribution ("a" app code) on every settlement.
    extensions: {
      // Registered under the "builder-code" extension key so the app code ("a")
      // is encoded into the settlement transaction's calldata (input data).
      [BUILDER_CODE_KEY]: declareBuilderCodeExtension(BUILDER_CODE),
      // Bazaar discovery metadata: tells agents how to call this endpoint.
      ...declareDiscoveryExtension({
        output: {
          example: {
            title: "The Horror Story Collection",
            license: "Single-reader license. Do not redistribute.",
          },
        },
      }),
    },
  },
  resourceServer,
)
