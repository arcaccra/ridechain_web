import { RidesTableList } from "@/components/Ride/RidesTableList";
import {MapView} from "@/components/MapView.tsx";
import useFetchData from "@/hooks/useFetchData.tsx";


export default function RidesManagement() {
    const {data, isLoading, isError} = useFetchData(`/apis/rides_apis/rides`, ["rides"],
        {}, true, 1000 * 60 * 60 * 3
    )

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error: {(isError as any).message}</div>
    if (!data) return <div>Error: No data</div>

    console.log(data)

  return (
    <div className="flex-1 p-8 h-full">
      <div className="flex gap-6 h-full">
          {/* Rides Table Section - 40% width */}
          <div className="w-[40%]">
              <div className="bg-gray-50 px-6 py-3 rounded-3xl h-full">
                  <h2 className="text-lg font-semibold text-gray-900 p-6">Real Time Rides</h2>
                  <RidesTableList rides={data ?? []} />
              </div>
          </div>

        {/* Map View Section - 60% width */}
        <div className="w-[60%]">
          <div className="bg-gray-50 p-6 rounded-3xl h-full">
              <div className="h-full">
                <MapView />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
