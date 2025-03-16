import { ReactNode } from "react"

interface ItemActionButtonProps {
  onClick: () => void
  children: ReactNode
}

const ItemActionButton: React.FC<ItemActionButtonProps> = (props) => (
  <button className="item-action-button" onClick={() => props.onClick()}>
    {props.children}
  </button>
)

export default ItemActionButton
