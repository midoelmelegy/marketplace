import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useMediaQuery } from '@react-hookz/web'
import { FC } from 'react'
import { useAccount } from 'wagmi'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'

type Props = {
  className?: HTMLButtonElement['className']
}

const ConnectWalletNavbar: FC<Props> = ({ className }) => {
  const account = useAccount()
  const isMobile = useMediaQuery('(max-width: 770px)')
  return (
    <ConnectButton.Custom>
      {({ openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading'

        return (
          <div
            {...((!ready || account.isConnected) && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
                display: 'none',
              },
            })}
          >
            {(() => {
              return (
                <button
                  onClick={openConnectModal}
                  type="button"
                  className={`z-10 block p-1.5 ${className}`}
                >
                 {isMobile ?
                    <MdOutlineAccountBalanceWallet className={`h-[32px] w-[32px]`} />
                  }
                </button>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default ConnectWalletNavbar
