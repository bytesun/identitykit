import { IdentityKitContext } from "@nfid/identitykit/react"
import clsx from "clsx"
import { useContext } from "react"

export function ConnectWalletButton() {
  const ctx = useContext(IdentityKitContext)
  if (!ctx) throw new Error("Identitykit Context is null")

  const { selectedSigner, toggleModal } = ctx

  return (
    <button
      id={"connect"}
      type="button"
      disabled={!!selectedSigner}
      onClick={toggleModal}
      className={clsx(
        "text-black bg-transparent border-gray-900",
        "hover:text-white hover:bg-gray-900 hover:border-gray-900 hover:shadow-md",
        "active:text-white active:bg-gray-900",
        "disabled:shadow-none disabled:bg-white disabled:border-gray-300 disabled:text-gray-300",
        "dark:border-white dark:text-white dark:hover:text-black dark:hover:bg-white",
        "dark:active:text-black dark:active:bg-gray-300 dark:active:border-none",
        "h-12 px-[15px] rounded-xl border"
      )}
    >
      {selectedSigner ? (
        "Connected"
      ) : (
        <>
          Connect<span className="hidden md:inline-block">&nbsp;wallet</span>
        </>
      )}
    </button>
  )
}
