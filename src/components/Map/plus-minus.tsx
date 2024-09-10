import { IconButton } from "@telegram-apps/telegram-ui";

import { Icon } from "../";

export default () => {
  return (
    <div className="plus-minus-map">
      <IconButton mode="bezeled" size="l">
        {Icon("plus")}
      </IconButton>
      <IconButton mode="bezeled" size="l">
        {Icon("minus")}
      </IconButton>
    </div>
  );
};
