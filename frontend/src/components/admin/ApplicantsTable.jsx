import { useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
      {status?.charAt(0)?.toUpperCase() + status?.slice(1)?.toLowerCase() || 'N/A'}
    </span>
  );
};

function ApplicantsTable({ applicants }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const statusHandler = async (status, id) => {
    if (!id || isUpdating) return;

    setIsUpdating(true);
    setUpdatingId(id);
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data?.status) {
        toast.success("Status Updated Successfully");
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error(err?.response?.data?.message || "Failed to update status");
    } finally {
      setIsUpdating(false);
      setUpdatingId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString.split("T")[0] || "N/A";
    }
  };

  const ApplicantCard = ({ item }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{item?.applicant?.fullName || "N/A"}</h3>
          <p className="text-gray-600">{item?.applicant?.email || "N/A"}</p>
          <div className="mt-2">
            <StatusBadge status={item?.status} />
          </div>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
              disabled={isUpdating && updatingId === item?.applicationId}
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-32">
            {shortlistingStatus.map((status) => (
              <button
                key={status}
                onClick={() => statusHandler(status, item?.applicationId)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                disabled={isUpdating && updatingId === item?.applicationId}
              >
                {status}
              </button>
            ))}
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-2 text-sm">
        <p className="text-gray-600">
          Contact: {item?.applicant?.phoneNumber || "N/A"}
        </p>
        <p className="text-gray-600">
          Date: {formatDate(item?.createdAt)}
        </p>
        {item?.applicant?.profile?.resume && (
          <div className="pt-2">
            <a
              className="text-blue-500 underline text-sm"
              href={item.applicant.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item?.applicant?.profile?.resumeOriginalName || "View Resume"}
            </a>
          </div>
        )}
      </div>
    </div>
  );

  if (!applicants?.applications?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No applicants found
      </div>
    );
  }

  return (
    <div className="w-full">
      {isMobile ? (
        <div className="px-4 sm:px-0 space-y-4">
          {applicants.applications.map((item) => (
            <ApplicantCard key={item?.applicationId || item?.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>A list of your recently applied users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">FullName</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Contact</TableHead>
                <TableHead className="font-semibold">Resume</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="text-right font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.applications.map((item) => (
                <TableRow
                  key={item?.applicationId || item?.id}
                  className="hover:bg-gray-50"
                >
                  <TableCell className="max-w-[200px] truncate">
                    {item?.applicant?.fullName || "N/A"}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {item?.applicant?.email || "N/A"}
                  </TableCell>
                  <TableCell>
                    {item?.applicant?.phoneNumber || "N/A"}
                  </TableCell>

                  <TableCell>
                    {item?.applicant?.profile?.resume ? (
                      <a
                        className="text-blue-500 underline"
                        href={item.applicant.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item?.applicant?.profile?.resumeOriginalName || "View Resume"}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>{formatDate(item?.createdAt)}</TableCell>
                  <TableCell>
                    <StatusBadge status={item?.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
                          disabled={isUpdating && updatingId === item?.applicationId}
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {shortlistingStatus.map((status) => (
                          <button
                            key={status}
                            onClick={() => statusHandler(status, item?.applicationId)}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                            disabled={isUpdating && updatingId === item?.applicationId}
                          >
                            {status}
                          </button>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default ApplicantsTable;