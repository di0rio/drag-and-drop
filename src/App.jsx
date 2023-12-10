import { useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import "./App.css";

const App = () => {
  const DraggableItem = ({ item }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "item",
      item: { id: item.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return (
      <div ref={drag} className="items">
        {item.text}
      </div>
    );
  };

  const DropZone = ({ title, items, onMoveItem }) => {
    const [{ isOver }, drop] = useDrop({
      accept: "item",
      drop: (draggedItem) => onMoveItem(draggedItem.id),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    return (
      <div ref={drop} className={`drop-zone ${isOver ? "onDrag" : ""} `}>
        <h4>{title}</h4>
        {items.map((item) => (
          <DraggableItem key={item.id} item={item} />
        ))}
      </div>
    );
  };

  const [listItem, setListItem] = useState([
    { id: " 1", text: "Item 1" },
    { id: " 2", text: "Item 2" },
    { id: " 3", text: "Item 3" },
  ]);
  const [list2Item, setList2Item] = useState([]);

  const handleMoveItem = (itemId, originList, destinationList) => {
    const item = destinationList.find((item) => item.id === itemId);
    if (!item) return;

    const newDestinationList = destinationList.filter(
      (item) => item.id !== itemId
    );
    const newOriginList = [...originList, item];

    if (originList === listItem) {
      setListItem(newOriginList);
      setList2Item(newDestinationList);
    } else {
      setListItem(newDestinationList);
      setList2Item(newOriginList);
    }
  };
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <div className="dropContainer">
          <DropZone
            title="list 1"
            items={listItem}
            onMoveItem={(itemId) => handleMoveItem(itemId, listItem, list2Item)}
          />

          <DropZone
            title="list 2"
            items={list2Item}
            onMoveItem={(itemId) => handleMoveItem(itemId, list2Item, listItem)}
          />
        </div>
      </DndProvider>
    </div>
  );
};

export default App;
