/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { console } from "window-or-global";

/**
 * @param {object} menu Plugin menu.
 * @returns {Plugin} A plugin to put adjust the position of calendar dropdown.
 */
export default (menu) => {
  /**
   * Adjusts the floating meun position after Flatpicker sets it.
   */
  const handlePreMenuPosition = () => {
    Promise.resolve().then(() => {
      const {
        menuContainer,
        config: menuConfig,
        _positionElement: positionElement,
      } = menu;
      const { appendTo } = menuConfig;
      const {
        left: containerLeft,
        top: containerTop,
      } = appendTo.getBoundingClientRect();
      const {
        left: refLeft,
        bottom: refBottom,
        width: refWidth,
      } = positionElement.getBoundingClientRect();

      appendTo.appendChild(menuContainer);
      appendTo.style.position = 'relative';

      console.log('AppendToPlugin', containerTop, refBottom, containerLeft, refLeft);

      menuContainer.style.top = `${refBottom - containerTop}px`;
      menuContainer.style.left = `${refLeft - containerLeft}px`;
      menuContainer.style.width = `${refWidth}px`;
    });
  };

  return {
    onPreMenuPosition: handlePreMenuPosition,
  };
};
