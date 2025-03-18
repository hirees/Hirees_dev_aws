import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from 'lucide-react';

const FilterPanel = ({ filters, setFilters, visaOptions }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium block mb-1">Search</label>
        <Input
          placeholder="Name, email, skills..."
          value={filters.searchQuery}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              searchQuery: e.target.value,
            }))
          }
          className="h-8 text-sm"
        />
      </div>

      <div>
        <label className="text-xs font-medium block mb-1">Viewed Status</label>
        <Select
          value={filters.viewedStatus}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, viewedStatus: value }))
          }
        >
          <SelectTrigger className="h-8 text-sm">
            <SelectValue placeholder="Filter by viewed status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Candidates</SelectItem>
            <SelectItem value="viewed">Previously Viewed</SelectItem>
            <SelectItem value="not-viewed">Not Yet Viewed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-xs font-medium block mb-1">Location</label>
        <Input
          placeholder="Filter by location"
          value={filters.location}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, location: e.target.value }))
          }
          className="h-8 text-sm"
        />
      </div>

      <div>
        <label className="text-xs font-medium block mb-1">Job Title</label>
        <Input
          placeholder="Filter by job title"
          value={filters.jobTitle}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, jobTitle: e.target.value }))
          }
          className="h-8 text-sm"
        />
      </div>

      <div>
        <label className="text-xs font-medium block mb-1">Visa Status</label>
        <Select
          value={filters.visaStatus}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, visaStatus: value }))
          }
        >
          <SelectTrigger className="h-8 text-sm">
            <SelectValue placeholder="Select visa status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Visa Types</SelectItem>
            {visaOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-xs font-medium block mb-1">Willing to Relocate</label>
        <Select
          value={filters.willingToRelocate}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, willingToRelocate: value }))
          }
        >
          <SelectTrigger className="h-8 text-sm">
            <SelectValue placeholder="Select preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Preferences</SelectItem>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        onClick={() =>
          setFilters({
            searchQuery: "",
            location: "",
            visaStatus: "all",
            willingToRelocate: "all",
            jobTitle: "",
            skills: [],
            viewedStatus: "all"
          })
        }
        className="w-full h-8 text-xs gap-1"
      >
        <Filter className="w-3 h-3" />
        Clear Filters
      </Button>
    </div>
  );
};

export default FilterPanel;