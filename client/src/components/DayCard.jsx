import React from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Image, Button } from "semantic-ui-react"
import { ApolloConsumer } from "react-apollo";

// Generates an array of the amount of days selected. Content displays the image, name, cost, location, description, and link.
const getItems = (count, array) =>
  Array.from({ length: count }, (v, activity) => activity).map(activity => ({
    id: `item-${activity}`,
    content: {
      image: array[activity].image,
      name: array[activity].name,
      cost: array[activity].cost,
      location: array[activity].location,
      description: array[activity].description,
      link: array[activity].website
    },
    orig: array[activity]
  }))

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const grid = 10

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",
  border: "2px solid black",

  // styles we need to apply on draggables
  ...draggableStyle
})

// Styling for when the card is being dragged.
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "white" : "white",
  padding: grid,
  width: "100%"
})

class DayCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: getItems(6, this.props.day)
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    )

    this.setState({
      items
    })
  }

  render() {
    return (
      <ApolloConsumer>
      {(client) => {
      return (
      <div>
        <Button
          onClick={() => {
            this.props.flip(this.props.day)
            let temp = this.props.itinerary.slice()
            temp[this.props.index] = this.state.items.map(elem => elem.orig)
            client.writeData({ data: { itinerary: JSON.stringify(temp) } })
          }}
        >
          Close
        </Button>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.items.map((item, index) => (
                  <div>
                    <p style={{ textAlign: "center" }}>
                      {index === 0
                        ? "Breakfast"
                        : index === 1
                          ? "Breakfast Activity"
                          : index === 2
                            ? "Lunch"
                            : index === 3
                              ? "Lunch Activity"
                              : index === 4
                                ? "Dinner"
                                : index === 5
                                  ? "Dinner Activity"
                                  : null}
                    </p>
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div>
                            <div style={{ textAlign: 'left' }}>
                              <a href={item.content.link} target="_blank">
                                <Image
                                  style={{ width: "150px", height: "100px" }}
                                  src={item.content.image}
                                />
                              </a>
                            </div>
                            <div
                              style={{
                                width: "100%",
                                float: "right",
                                marginTop: "-8%",
                              }}
                            >
                              <div style={{ display: "inline-block" }}>
                                <strong>{item.content.name}</strong>
                              </div>
                              <div
                                style={{
                                  opacity: ".6",
                                  float: "right"
                                }}
                              >
                                {item.content.cost === 0
                                  ? "Free"
                                  : item.content.cost === 1
                                    ? "$"
                                    : item.content.cost === 2
                                      ? "$$"
                                      : item.content.cost === 3
                                        ? "$$$"
                                        : item.content.cost === 4
                                          ? "$$$$"
                                          : null}
                              </div>
                            </div>
                            <div
                              style={{
                                opacity: ".6",
                                width: "100%",
                                float: "right",
                                marginTop: "-7%",
                              }}
                            >
                              <em>{item.content.location}</em>
                            </div>
                            <div
                              style={{
                                textAlign: 'left',
                                width: "88%",
                                float: "right",
                                marginTop: "-5%"
                              }}
                            >
                              {item.content.description.length > 450
                                ? item.content.description.substring(0, 450) +
                                  " ..."
                                : item.content.description}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>)
      }}
      </ApolloConsumer>
    )
  }
}

export default DayCard
