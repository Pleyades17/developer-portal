import { Dispatch, Fragment, memo, SetStateAction, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Icon } from "common/Icon";
import cn from "classnames";

export type Option = { label: string; value: string };

export const Selector = memo(function Selector(props: {
  options: Array<Option>;
  selected: Option;
  setOption: Dispatch<SetStateAction<Option>>;
}) {
  return (
    <div className="flex">
      <Menu>
        <div className="grid justify-start grid-flow-col gap-x-3 items-center">
          <span className="text-[18px]">{props.selected?.label}</span>
          <Menu.Button>
            <div className="w-4 h-4 flex justify-center items-center bg-neutral-dark/10 rounded-full">
              <Icon name="angle-down" className="w-2.5 h-2.5" />
            </div>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="relative ">
            <Menu.Items className="absolute top-8 -right-5 shadow-lg rounded-lg">
              {props.options
                .filter((option) => option.value !== props.selected.value)
                .map((option) => (
                  <Menu.Item key={`stats-selector-${option.value}`} as={"div"}>
                    {({ active }) => (
                      <button
                        onClick={() => props.setOption(option)}
                        className="bg-ffffff py-3 px-4 w-full text-start min-w-[140px]"
                      >
                        {option.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
            </Menu.Items>
          </div>
        </Transition>
      </Menu>
    </div>
  );
});
