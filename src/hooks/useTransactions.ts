"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ProfileService, type Transaction } from "@/services/ProfileService";

export function useTransactions() {
	return useQuery<Transaction[], Error>({
		queryKey: ["transactions"],
		queryFn: ProfileService.getTransactions,
		staleTime: 1000 * 60 * 2, // 2 minutes
	});
}

export function useVerifyTransaction() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (txn_id: string) => ProfileService.verifyTransaction(txn_id),
		onSuccess: () => {
			toast.success("Transaction verified! Refreshing...");
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			queryClient.invalidateQueries({ queryKey: ["tickets"] });
		},
		onError: (error) => {
			toast.error(`Verification failed: ${error.message}`);
		},
	});
}
