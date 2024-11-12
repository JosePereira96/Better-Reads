import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import TBRItem from './TBRItem'; 

import './TBR.css'

function TBR({ loadLocalStorage, setLocalStorage, updateLibrary, updateTBR}) {

  let fileTBR = loadLocalStorage('tbr');

  const [tbr,setTBR] = useState(fileTBR);

  useEffect( () => {
    setLocalStorage('tbr', tbr)
  }, [tbr]);
  
  


  
  
  
    

  
  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const monthSourceIndex = tbr.findIndex(
      (month) => String(month.id) === source.droppableId
    );
    const monthDestinationIndex = tbr.findIndex(
      (month) => String(month.id) === destination.droppableId
    );

    const newSourceItems = [...tbr[monthSourceIndex].books];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...tbr[monthDestinationIndex].books]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const reorderedTBR = [...tbr];

    reorderedTBR[monthSourceIndex] = {
      ...tbr[monthSourceIndex],
      books: newSourceItems,
    };
    reorderedTBR[monthDestinationIndex] = {
      ...tbr[monthDestinationIndex],
      books: newDestinationItems,
    };

    setTBR(reorderedTBR);
  };

  

  function MonthList({ month }) {
    return (
      <Droppable droppableId={String(month.id)} index={month.id} key={month.id} type="group">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="month">
              <h3>{month.name}</h3>
              
              {month.books.map((book, i) => {
                  return(<TBRItem book={book}
                                  index={i} 
                                  loadLocalStorage={loadLocalStorage}
                                  updateLibrary={updateLibrary} 
                                  updateTBR={updateTBR} />);
                }
              )}

              
            {provided.placeholder}
          </div>

        )}
      </Droppable>
    );
  }

  if(!tbr){
    return <Navigate to="../home"/>;
  }
  
  return (
    <>
    <div className="TBRContainer">
      <div className="header">
        <h2>TBR <img src="./books.jpg"/></h2>
      </div>


      <DragDropContext onDragEnd={handleDragAndDrop}>
        <div className="tbr-list">
          {tbr && tbr.map( month => (
            <MonthList month={month}/>
          ))}
        </div>
      </DragDropContext>
      </div>
    </>
  );
}





export default TBR;