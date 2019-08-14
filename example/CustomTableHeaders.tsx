import * as React from "react";
import { Component, useState } from "react";
import Scheduler, {
  SchedulerData,
  SchedulerViewTypes,
  NonAgendaCellHeaderTemplateResolverArgs,
} from "../src/Scheduler";
import * as moment from "moment";
import * as ExampleFunction from "./utils/ExampleFunctions";
import { DemoData } from "./utils/DemoData";
import Nav from "./utils/Nav";
import withDragDropContext from "./utils/withDnDContext";

class CustomHeaders extends Component<{}, { viewModel: SchedulerData }> {
  constructor(props: Readonly<{}>) {
    super(props);

    const schedulerData = new SchedulerData(ExampleFunction.getNow(), SchedulerViewTypes.Week, false, false, {
      calendarPopoverEnabled: false,
    });
    schedulerData.setResources(DemoData.resources);
    schedulerData.setEvents(DemoData.events);
    this.state = {
      viewModel: schedulerData,
    };
  }

  public nonAgendaCellHeaderTemplateResolver = (args: NonAgendaCellHeaderTemplateResolverArgs) => {
    const datetime = moment(args.item.time);
    let isCurrentDate = false;

    if (args.schedulerData.viewType === SchedulerViewTypes.Day) {
      isCurrentDate = datetime.isSame(new Date(), "hour");
    } else {
      isCurrentDate = datetime.isSame(new Date(), "day");
    }

    if (isCurrentDate) {
      args.style.backgroundColor = "#118dea";
      args.style.color = "white";
    }

    return (
      <th key={args.item.time} className={`header3-text`} style={args.style}>
        {
          args.formattedDateItems.map((formattedItem: any, index: any) => (
            <div key={index}
              dangerouslySetInnerHTML={{ __html: formattedItem.replace(/[0-9]/g, "<b>$&</b>") }} />
          ))
        }
      </th>
    );
  }

  public render() {
    const { viewModel } = this.state;

    return (
      <div>
        <Nav />
        <div>
          <h3 style={{ textAlign: "center" }}>Custom table headers (with disabled calendar popup)</h3>
          <Scheduler schedulerData={viewModel}
            prevClick={ExampleFunction.prevClick.bind(this)}
            nextClick={ExampleFunction.nextClick.bind(this)}
            onSelectDate={ExampleFunction.onSelectDate.bind(this)}
            onViewChange={ExampleFunction.onViewChange.bind(this)}
            eventItemClick={ExampleFunction.eventClicked.bind(this)}
            viewEventClick={ExampleFunction.ops1.bind(this)}
            viewEventText="Ops 1"
            viewEvent2Text="Ops 2"
            viewEvent2Click={ExampleFunction.ops2.bind(this)}
            updateEventStart={ExampleFunction.updateEventStart.bind(this)}
            updateEventEnd={ExampleFunction.updateEventEnd.bind(this)}
            moveEvent={ExampleFunction.moveEvent.bind(this)}
            newEvent={ExampleFunction.newEvent.bind(this)}
            nonAgendaCellHeaderTemplateResolver={this.nonAgendaCellHeaderTemplateResolver}
            toggleExpandFunc={ExampleFunction.toggleExpandFunc.bind(this)}
          />
        </div>
      </div>
    );
  }

}

export default withDragDropContext(CustomHeaders);
