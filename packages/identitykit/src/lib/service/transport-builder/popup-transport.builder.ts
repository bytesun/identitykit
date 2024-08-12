import { Transport } from "@slide-computer/signer"
import { TransportBuilderRequest } from "./transport.builder"
import { PostMessageTransport } from "@slide-computer/signer-web"
import { openPopup } from "../../../libs/react/utils"

export function getPopupTransportBuilder({
  url,
  label,
  width,
  height,
}: TransportBuilderRequest): Transport {
  return new PostMessageTransport({
    openWindow: () => openPopup(url, label, width, height),
  })
}