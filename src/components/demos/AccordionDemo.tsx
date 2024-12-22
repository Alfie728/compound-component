import Accordion from "../Accordion/Accordion";
import { data } from "../Accordion/data";

export function AccordionDemo() {
  return (
    <Accordion>
      <Accordion.Title>Frequently Asked Questions</Accordion.Title>
      <Accordion.Frame>
        {data.map((item) => (
          <Accordion.Item key={item.id}>
            <Accordion.Header>{item.header}</Accordion.Header>
            <Accordion.Body>{item.body}</Accordion.Body>
          </Accordion.Item>
        ))}
        <Accordion.Item>
          <Accordion.Header>Sign up</Accordion.Header>
          <Accordion.Body>
            <fieldset className="flex flex-col gap-4">
              <p className="flex items-center gap-4">
                <label htmlFor="b-add1" className="w-24 text-sm font-medium">
                  Address 1:
                </label>
                <input
                  type="text"
                  name="b-add1"
                  id="b-add1"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-black"
                />
              </p>
              <p className="flex items-center gap-4">
                <label htmlFor="b-add2" className="w-24 text-sm font-medium">
                  Address 2:
                </label>
                <input
                  type="text"
                  name="b-add2"
                  id="b-add2"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-black"
                />
              </p>
              <p className="flex items-center gap-4">
                <label htmlFor="b-city" className="w-24 text-sm font-medium">
                  City:
                </label>
                <input
                  type="text"
                  name="b-city"
                  id="b-city"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-black"
                />
              </p>
              <p className="flex items-center gap-4">
                <label htmlFor="b-state" className="w-24 text-sm font-medium">
                  State:
                </label>
                <input
                  type="text"
                  name="b-state"
                  id="b-state"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-black"
                />
              </p>
              <p className="flex items-center gap-4">
                <label htmlFor="b-zip" className="w-24 text-sm font-medium">
                  Zip Code:
                </label>
                <input
                  type="text"
                  name="b-zip"
                  id="b-zip"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-black"
                />
              </p>
            </fieldset>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion.Frame>
    </Accordion>
  );
}
