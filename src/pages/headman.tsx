import { List } from "@telegram-apps/telegram-ui";
import { InlineButtonsItem } from "@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem";

export default () => {
  return (
    <List>
      <InlineButtonsItem style={{ width: "100%" }} mode="bezeled">
        Для старост
      </InlineButtonsItem>
    </List>
  );
};
