import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import ProjectListItem from "./../pages/project/ProjectListItem"

function DragAndDropList({ setItemsData, itemsData, droppableId }) {
  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination || destination.index === source.index) {
      return
    }
    const reordered = [...itemsData]

    reordered.splice(source.index, 1)
    reordered.splice(
      destination.index,
      0,
      itemsData.filter(({ _id }) => _id.toString() === draggableId)[0]
    )
    setItemsData(reordered)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {itemsData?.map((item, index) => (
              <Draggable
                key={item?._id.toString()}
                draggableId={item?._id.toString()}
                index={index}
              >
                {(innerProvided) => (
                  <div
                    {...innerProvided.draggableProps}
                    {...innerProvided.dragHandleProps}
                    ref={innerProvided.innerRef}
                  >
                    <ProjectListItem projectData={item} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DragAndDropList
