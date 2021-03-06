import React from "react";
import { useAd } from "queries/ads";
import OutboundLink from "components/seo/OutboundLink";
import Spinner from "components/ui/Spinner";
import Image from "next/image";

function Ad({ booking: initialBooking, test = false }) {
	const { data, isLoading, error } = useAd();

	if (!initialBooking && (isLoading || error)) {
		return (
			<div className="ad-case">
				<div className="flex items-center justify-center h-24 mb-2 border border-gray-200 rounded-md">
					<Spinner small text="Loading indie ad..." />
				</div>
			</div>
		);
	}

	const booking = initialBooking ? initialBooking : data;
	if (!booking) return null;

	return (
		<div
			className={
				booking.type === "BANNER" ? "flex flex-col" : "flex flex-row"
			}
		>
			<OutboundLink
				to={`https://api.getmakerlog.com/ads/${booking.id}/click/`}
				className="flex-shrink-0"
			>
				{test ? (
					<img
						className={
							"flex-shrink-0 flex-grow-0 border border-gray-200 rounded-md " +
							(booking.type === "BANNER"
								? "mb-2"
								: "h-12 w-12 mr-2")
						}
						src={booking.image}
						alt={booking.text}
					/>
				) : (
					<Image
						className={
							"flex-shrink-0 flex-grow-0 border border-gray-200 rounded-md " +
							(booking.type === "BANNER"
								? "mb-2"
								: "h-12 w-12 mr-2")
						}
						key={booking.id}
						layout={"fixed"}
						unsized
						src={booking.image}
						alt={booking.text}
					/>
				)}
			</OutboundLink>
			<div className={booking.type === "BANNER" ? "text-xs" : "text-xs"}>
				<OutboundLink to={booking.url} icon>
					{booking.text}
				</OutboundLink>
			</div>
		</div>
	);
}

export default Ad;
