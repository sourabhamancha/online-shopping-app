import React from "react";
import _ from "lodash";

// sem-ui
import { Card, Placeholder, Segment, Label, Divider } from "semantic-ui-react";

function HomePlaceholder() {
  return (
    <Card.Group doubling itemsPerRow={4} stackable>
      {_.times(12, (i) => (
        <Card key={i}>
          <Segment>
            <Label color="teal" ribbon>
              Category
            </Label>
            <Placeholder>
              <Placeholder.Image square />
            </Placeholder>
            <Divider />
            <Card.Content>
              <Placeholder>
                <Placeholder.Header>
                  <Placeholder.Line length="medium" />
                  <Placeholder.Line length="very short" />
                </Placeholder.Header>
              </Placeholder>
            </Card.Content>
          </Segment>
        </Card>
      ))}
    </Card.Group>
  );
}

export default HomePlaceholder;
