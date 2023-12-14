//hook = useEfect || useState === São utilizados para dar vida ao projeto
import { useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import "./App.css";

const App = () => {
  // Define um componente DraggableItem que pode ser arrastado pelo usuário
  const DraggableItem = ({ item }) => {
    // Usa o hook useDrag do react-dnd para definir o tipo, o item e o estado de arrastar
    const [{isDragging}, drag] = useDrag(() => ({
      type: "item",
      item: { id: item.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));
    // Retorna um elemento div que tem uma referência para o drag

    return (
      <div ref={drag} className="items">
        {item.text}
      </div>
    );
  };
  // Define um componente DropZone que pode receber itens arrastados pelo usuário
  const DropZone = ({ title, items, onMoveItem }) => {
    // Usa o hook useDrop do react-dnd para definir o tipo aceito, a função de soltar e o estado de sobrepor
    const [{ isOver }, drop] = useDrop({
      accept: "item",
      drop: (draggedItem) => onMoveItem(draggedItem.id),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });
    // Retorna um elemento div que tem uma referência para o drop
    return (
      <div ref={drop} className={`drop-zone ${isOver ? "onDrag" : ""} `}>
        <h4>{title}</h4>
        {items.map((item) => (
          <DraggableItem key={item.id} item={item} />
        ))}
      </div>
    );
  };
  // Usa o hook useState para definir o estado dos itens da lista 1 e da lista 2
  const [listItem, setListItem] = useState([
    { id: " 1", text: "Item 1" },
    { id: " 2", text: "Item 2" },
    { id: " 3", text: "Item 3" },
  ]);
  const [list2Item, setList2Item] = useState([]);
  // Define uma função para mover um item de uma lista para outra
  const handleMoveItem = (itemId, originList, destinationList) => {
    // Encontra o item na lista de destino pelo id
    const item = destinationList.find((item) => item.id === itemId);
    if (!item) return;
    // Cria uma nova lista de destino sem o item
    const newDestinationList = destinationList.filter(
      (item) => item.id !== itemId
    );
    // Cria uma nova lista de origem com o item
    const newOriginList = [...originList, item];
    // Atualiza o estado das listas de acordo com a origem e o destino
    // if (originList === listItem) {
    //   setListItem(newOriginList);
    //   setList2Item(newDestinationList);
    // } else {
    //   setListItem(newDestinationList);
    //   setList2Item(newOriginList);
    // }
    setListItem(originList === listItem ? newOriginList : newDestinationList);
    setList2Item(originList === listItem ? newDestinationList : newOriginList);
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
