import React from "react";
import { matchSorter } from "match-sorter";
import { SUPPORTED_TAGS, MENU_HEIGHT } from "@/utils/editor/data";

interface CSelectMenuProps {
  position: { x: number | null; y: number | null };
  onSelect: (tag: string) => void;
  close: () => void;
}

interface CSelectMenuItem {
    id: string;
  tag: string;
  label: string;

}

interface CSelectMenuState {
  command: string;
  items: CSelectMenuItem[];
  selectedItem: number;
}


class CSelectMenu extends React.Component<CSelectMenuProps, CSelectMenuState> {
  constructor(props: CSelectMenuProps) {
    super(props);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.state = {
      command: "",
      items: SUPPORTED_TAGS,
      selectedItem: 0,
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyDownHandler);
  }

  componentDidUpdate(prevProps: CSelectMenuProps, prevState: CSelectMenuState) {
    const command = this.state.command;
    if (prevState.command !== command) {
      const items = matchSorter(SUPPORTED_TAGS, command, { keys: ["tag"] });
      this.setState({ items: items });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDownHandler);
  }

  keyDownHandler(e: KeyboardEvent) {
    const items = this.state.items;
    const selected = this.state.selectedItem;
    const command = this.state.command;

    switch (e.key) {
      case "Enter":
        e.preventDefault();
        this.props.onSelect(items[selected].tag);
        break;
      case "Backspace":
        if (!command) this.props.close();
        this.setState({ command: command.substring(0, command.length - 1) });
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevSelected = selected === 0 ? items.length - 1 : selected - 1;
        this.setState({ selectedItem: prevSelected });
        break;
      case "ArrowDown":
      case "Tab":
        e.preventDefault();
        const nextSelected = selected === items.length - 1 ? 0 : selected + 1;
        this.setState({ selectedItem: nextSelected });
        break;
      default:
        this.setState({ command: this.state.command + e.key });
        break;
    }
  }

  render() {
    if ((this.props.position.x === null) || (this.props.position.y === null)) {
        return (
            <></>
        )
    }

    const x = this.props.position.x;
    const y = this.props.position.y - MENU_HEIGHT;
    const positionAttributes = { top: y, left: x };

    return (
      <div className="CSelectMenu" style={positionAttributes}>
        <div className="Items">
          {this.state.items.map((item, key) => {
            const selectedItem = this.state.selectedItem;
            const isSelected = this.state.items.indexOf(item) === selectedItem;
            return (
              <div
                className={isSelected ? "Selected" : undefined}
                key={key}
                role="button"
                tabIndex={0}
                onClick={() => this.props.onSelect(item.tag)}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CSelectMenu;
