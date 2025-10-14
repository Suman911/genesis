import Button from "@/components/ui/util/button";
import { FaCheck, FaSpinner, FaArrowRight, FaLink } from "react-icons/fa";

const TestButton = () => {
    return (
        <div className="flex flex-col gap-8 p-4 bg-neutral-300">

            {/* Size Variants */}
            <section>
                <h2 className="text-lg font-semibold mb-2">Size Variants</h2>
                <div className="flex gap-4 items-center">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                </div>
            </section>

            {/* Round Variants */}
            <section>
                <h2 className="text-lg font-semibold mb-2">Rounded Corners</h2>
                <div className="flex gap-4 items-center">
                    <Button round="sm">Rounded-sm</Button>
                    <Button round="md">Rounded-md</Button>
                    <Button round="lg">Rounded-lg</Button>
                    <Button round="xl">Rounded-xl</Button>
                    <Button round="full">Rounded-full</Button>
                </div>
            </section>

            {/* Color Variants (Solid) */}
            <section>
                <h2 className="text-lg font-semibold mb-2">Color Variants (Solid)</h2>
                <div className="flex gap-4 items-center flex-wrap">
                    <Button color="primary">Primary</Button>
                    <Button color="gray">Gray</Button>
                    <Button color="info">Info</Button>
                    <Button color="danger">Danger</Button>
                    <Button color="success">Success</Button>
                    <Button color="warning">Warning</Button>
                </div>
            </section>

            {/* Outlined Variants */}
            <section>
                <h2 className="text-lg font-semibold mb-2">Outlined Variants</h2>
                <div className="flex gap-4 items-center flex-wrap">
                    <Button color="primary" outlined>Primary Outlined</Button>
                    <Button color="gray" outlined>Gray Outlined</Button>
                    <Button color="info" outlined>Info Outlined</Button>
                    <Button color="danger" outlined>Danger Outlined</Button>
                    <Button color="success" outlined>Success Outlined</Button>
                    <Button color="warning" outlined>Warning Outlined</Button>
                </div>
            </section>

            {/* Disabled Variants */}
            <section>
                <h2 className="text-lg font-semibold mb-2">Disabled State</h2>
                <div className="flex gap-4 items-center flex-wrap">
                    <Button disabled>Primary Disabled</Button>
                    <Button color="danger" disabled>Danger Disabled</Button>
                    <Button color="info" outlined disabled>Info Outlined Disabled</Button>
                    <Button color="success" outlined disabled>Success Outlined Disabled</Button>
                </div>
            </section>

            {/* Loading State Simulation */}
            <section>
                <h2 className="text-lg font-semibold mb-2">Loading State (Simulated)</h2>
                <div className="flex gap-4 items-center">
                    <Button disabled className="flex items-center gap-2">
                        <FaSpinner className="animate-spin" /> Loading
                    </Button>
                    <Button color="info" outlined disabled className="flex items-center gap-2">
                        <FaSpinner className="animate-spin" /> Please wait
                    </Button>
                </div>
            </section>

            {/* Full Width Button */}
            <section>
                <h2 className="text-lg font-semibold mb-2">Full Width Button</h2>
                <Button className="w-full justify-center">Full Width</Button>
            </section>

            {/* Icon Buttons */}
            <section>
                <h2 className="text-lg font-semibold mb-2">Icon Buttons</h2>
                <div className="flex gap-4 items-center">
                    <Button size="i" round="full">
                        <FaCheck />
                    </Button>
                    <Button size="i" round="full">
                        <FaArrowRight size={24} />
                    </Button>
                    <Button size="i" round="full" color="danger" outlined>
                        <FaLink size={32} />
                    </Button>
                </div>
            </section>

            {/* Icon with Text */}
            <section>
                <h2 className="text-lg font-semibold mb-2">Icon + Text</h2>
                <div className="flex gap-4 items-center">
                    <Button className="flex items-center gap-2">
                        <FaCheck /> Confirm
                    </Button>
                    <Button color="warning" outlined className="flex items-center gap-2">
                        <FaArrowRight /> Next Step
                    </Button>
                </div>
            </section>

            {/* Custom Styling Examples */}
            <section>
                <h2 className="text-lg font-semibold mb-2">Custom Styling</h2>
                <div className="flex gap-4 items-center">
                    <Button className="shadow-lg">Shadowed</Button>
                    <Button className="opacity-75 hover:opacity-100">
            Fade In On Hover
                    </Button>
                    <Button className="uppercase tracking-widest">
            Uppercase Wide
                    </Button>
                </div>
            </section>

            {/* Button as a Link */}
            <section>
                <h2 className="text-lg font-semibold mb-2">Button as Link</h2>
                {/* <Button as="a" href="https://example.com" target="_blank" rel="noopener noreferrer" color="info" outlined>
          Visit Example.com
        </Button> */}
            </section>
        </div>
    );
};

export default TestButton;