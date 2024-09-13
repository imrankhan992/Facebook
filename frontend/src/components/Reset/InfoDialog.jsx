import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Copy } from "lucide-react";
import { Input } from "../ui/input";

const InfoDialog = () => {
  return (
    <Dialog className="">
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className=" py-6 text-xl font-bold px-4 bg-secondaryColorBg"
        >
          ?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-white ">
        <DialogHeader className={"border-b pb-3 border-borderColor"}>
          <DialogTitle className="text-2xl p-0 text-center">
            Create a strong password
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <div className="leading-5 text-lg">
              <h3>As you create your password, remember the following:</h3>
              <ul>
                <li>It <strong>should</strong> not contain your name.</li>
                <li>It <strong>should</strong> not contain a common dictionary word.</li>
                <li>It <strong>should</strong> contain one or more numbers.</li>
                <li>It <strong>should</strong> have both uppercase and lowercase characters.</li>
                <li>It <strong>should</strong> be at least six characters long.</li>
              </ul>
            </div>
          </div>
         
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="bg-blueColor text-white px-8 font-bold text-lg hover:bg-blueColor">
              OK
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
