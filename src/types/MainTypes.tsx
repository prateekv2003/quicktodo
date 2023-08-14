
export interface TicketType {
    id: string;
    title: string;
    tag: string[];
    userId: string;
    status: string;
    priority: number;
}

export interface UserType {
    id: string;
    name: string;
    available: boolean;
}


export interface FilteredData {
    title: string;
    icon?: JSX.Element;
    tickets: TicketType[];
}

export interface StatusType {
    name: string;
    icon: JSX.Element;
}

export interface PriorityType {
    rank: number;
    name: string;
    icon: JSX.Element;
}