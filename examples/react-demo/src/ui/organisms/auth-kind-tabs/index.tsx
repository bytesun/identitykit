import { IdentityKitAuthKind, IdentityKitAuthKindType } from "@nfid/identitykit"
import clsx from "clsx"
import { ResponseSection } from "../../molecules/response-section"
import { CodeSection } from "../../molecules/code-section"

const getUsageExample = (authKind: IdentityKitAuthKindType) =>
  `import { IdentityKitProvider, IdentityKitTheme, ConnectWalletButton } from "@nfid/identitykit/react"
import { NFID, IdentityKitAuthKindType, IdentityKitAuthKind } from "@nfid/identitykit"

<IdentityKitProvider 
  signers={[NFID]}
  theme={IdentityKitTheme.LIGHT} // LIGHT, DARK, SYSTEM (by default) 
  authKind={IdentityKitAuthKind.${authKind}}
>
  <ConnectWalletButton />
</IdentityKitProvider>`

export function AuthKindTabs({
  value,
  onChange,
  accountsResponseJson = "{}",
  delegationResponseJson = "{}",
}: {
  value: IdentityKitAuthKindType
  onChange: (kind: IdentityKitAuthKindType) => void
  accountsResponseJson?: string
  delegationResponseJson?: string
}) {
  const isAccounts = value === IdentityKitAuthKind.ACCOUNTS
  return (
    <>
      <div className="font-semibold text-black dark:text-white border-b-2 border-grey-500 dark:border-zinc-700 w-auto mb-1">
        <ul className="flex flex-wrap">
          <li
            onClick={() => {
              if (!isAccounts) onChange(IdentityKitAuthKind.ACCOUNTS)
            }}
            className={clsx(
              "w-1/2 sm:w-[150px] cursor-pointer border-b-2 -mb-[2px]",
              isAccounts
                ? "text-primary border-primary"
                : "border-transparent hover:text-primary hover:border-primary"
            )}
          >
            <div className="inline-block py-2 rounded-t-lg">Account</div>
          </li>
          <li
            onClick={() => {
              if (isAccounts) onChange(IdentityKitAuthKind.DELEGATION)
            }}
            className={clsx(
              "w-1/2 sm:w-[150px] cursor-pointer border-b-2 -mb-[2px]",
              !isAccounts
                ? "text-primary border-primary"
                : "border-transparent hover:text-primary hover:border-primary"
            )}
          >
            <div className="inline-block py-2 rounded-t-lg">Delegation</div>
          </li>
        </ul>
      </div>
      <div>
        {isAccounts ? (
          <>
            <small className="mb-5 mt-2 block">
              Accounts are standard wallet address strings users may have used across the ICP
              ecosystem, for example to store assets, participate in defi, or engage in a variety of
              other activity.
            </small>
            <ResponseSection value={accountsResponseJson} />
            <CodeSection className="mt-3" value={getUsageExample(IdentityKitAuthKind.ACCOUNTS)} />
          </>
        ) : (
          <>
            <small className="mb-5 mt-2 block">
              Delegations are accounts that have been pre-approved to execute transactions on the
              user's behalf, resulting in the removal of wallet approval prompts.
            </small>
            <ResponseSection value={delegationResponseJson} />
            <CodeSection className="mt-3" value={getUsageExample(IdentityKitAuthKind.DELEGATION)} />
          </>
        )}
      </div>
    </>
  )
}