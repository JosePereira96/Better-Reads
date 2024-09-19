import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";

import RemoveButton from './RemoveButton';
import ReadButton from './ReadButton';

//import './TBRItem.css';

function TBRItem({ book, index, updateLibrary, updateTBR }){
  
  const [isBookVisible, setIsBookVisible] = useState(true);

  const [bookInfo, setBookInfo] = useState(book);
  const coverImageSrc = bookInfo.imageURL[0];

 

  return(

    <>
      {isBookVisible && ( 
          <Draggable draggableId={bookInfo.BookID} index={index} key={bookInfo.BookID}>
            {(provided) => (
              <div
                className="book"
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                ref={provided.innerRef}
              >
                  <div className="bookInfo">

                    <div className="coverPhoto">
                    	<img src={coverImageSrc}/>
                    </div>
                    
                    <div className="titleAuthor">
                      <p className="bookTitle">{bookInfo.Title}</p>
                      <p className="bookAuthor">{bookInfo.Author}</p>
                    </div>

                    <div className="buttons">
                      <div className="readButton">
                        <ReadButton   bookInfo={bookInfo} 
                                      setBookInfo={setBookInfo}
                                      setIsBookVisible={setIsBookVisible}
                                      updateLibrary={updateLibrary}
                                      updateTBR={updateTBR}/>
                      </div>
                      <div className="removeButton">
                        <RemoveButton bookInfo={bookInfo} 
                                      setBookInfo={setBookInfo} 
                                      setIsBookVisible={setIsBookVisible} 
                                      context={"tbr"}
                                      updateLibrary={updateLibrary}
                                      updateTBR={updateTBR}
                                      />
                      </div>
                    </div>

                  </div>
                  {provided.placeholder}    
                </div>
            )}
          </Draggable>
      )}       
    </>
  );
};

export default TBRItem;