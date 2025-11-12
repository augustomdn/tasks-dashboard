import { Input } from "@/components/ui/input";

interface Props {
    value: string;
    setFilterTask: (value: string) => void;


}

export default function SearchTaskInputComponent({value, setFilterTask} : Props) {
    return (
        <Input
            type="text"
            placeholder="Pesquisar"
            className="bg-gray-200 outline-none py-2 w-[90vw] "
            value={value}
            onChange={(e) => setFilterTask(e.target.value)}
        />
    )
}