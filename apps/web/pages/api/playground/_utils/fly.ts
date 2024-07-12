// @ts-ignore
import { gql, GraphQLClient } from 'graphql-request';

import { FLYIO_BASE, FLYIO_TOKEN } from './constants';

const endpoint = 'https://api.fly.io/graphql';
const requestHeaders = {
    Authorization: `Bearer ${FLYIO_TOKEN}`,
};

const fly = new GraphQLClient(endpoint, { headers: requestHeaders });

type Edge<T> = {
    node: T
}

type ListQueryResponse<T> = {
    edges: Edge<T>[]
}

export type App = {
    id: string;
    name: string;
    state: "PENDING" | "DEPLOYED" | "SUSPENDED";
    status: string;
    createdAt: string;
}

/**
 * @section Machines
 */
/**
 * Creates a machine running fennel-vs, assigned to the provided app name.
 * TODO: In the request body we're hardcoding the fennel token from env. This should be replaced with a call to an endpoint that creates a branch and token for the user, and returns the credentials
 */
export const createMachine = async (appName: string, token: string): Promise<string> => {
    console.log('Creating playground with token: ', token);
    const machineResponse = await fetch(`${FLYIO_BASE}/apps/${appName}/machines`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${FLYIO_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            config: {
                image: "registry.fly.io/fennel-vs:latest",
                skip_launch: false,
                skip_service_registration: false,
                env: {
                    "AUTH": "none",
                    "PASSWORD": "",
                    "FENNEL_ENDPOINT": process.env.FENNEL_ENDPOINT,
                    "FENNEL_TOKEN": token,
                    "FENNEL_BRANCH": appName
                },
                guest: {
                    cpus: 1,
                    memory_mb: 1024,
                    cpu_kind: 'shared'
                },
                metadata: {
                    fly_process_group: "app"
                },
                services: [
                    {
                        ports: [
                            {
                                "port": 80,
                                "handlers": [
                                    "http"
                                ],
                                "force_https": true
                            },
                            {
                                "port": 443,
                                "handlers": [
                                    "http",
                                    "tls"
                                ]
                            }
                        ],
                        protocol: "tcp",
                        internal_port: 8080,
                        autostop: true,
                        autostart: true,
                        min_machines_running: 0,
                        force_instance_key: null
                    }
                ]
            }
        })
    });

    const machine = await machineResponse.json();

    if (machine.error) {
        throw new Error(machine.error);
    }

    return machine.id;
}

/**
 * @section Apps
 */

/**
 * Initialize a new Fly app for a new playground instance.
 */
export const createApp = async (name: string): Promise<{ id: string, name: string }> => {
    const document = gql`
        mutation createApp($input: CreateAppInput!) {
            createApp(input: $input) {
                app {
                    id: internalId
                    name
                    state
                    status
                    createdAt
                }
            }
        }
    `;

    const variables = {
        input: {
            organizationId: "m8Y4w6lakLYJ3IxRnJ48ML6Bb8UvweKP4",
            name,
        }
    };

    const data: { createApp: { app: { id: string, name: string } } } = await fly.request({
        document,
        variables,
    })

    return data.createApp.app;
};

/**
 * Delete the provided app from fly.
 */
export const deleteApp = async (appId: string): Promise<void> => {
    const document = gql`
        mutation createApp($appId: ID!) {
            deleteApp(appId:$appId) {
                organization {
                    id
                }
            }
        }
    `;

    await fly.request({
        document,
        variables: { appId },
    });
};

/**
 * List all apps currently on Fly.
 */
export const listApps = async (): Promise<Edge<App>[]> => {
    const document = gql`
        query {
            apps {
                edges {
                    node {
                        id: internalId,
                        name
                        state
                        status
                        createdAt
                    }
                }
            }
        }
    `;

    const data: { apps: ListQueryResponse<App> } = await fly.request({ document });

    return data.apps.edges;
}

/**
 * Get a specific Fly app by name.
 */
export const getApp = async (name: string): Promise<App> => {
    const document = gql`
        query ($name: String!) {
            app(name: $name) {
                id: internalId
                name
                state
                status
                createdAt
            }
        }
    `;

    const data = await fly.request<{ app: App }>({
        document,
        variables: { name }
    });

    return data.app;
}

/**
 * Allocates an IP Address to make the provided app name publicly accessible.
 */
export const allocateIpAddress = async (appName: string): Promise<void> => {
    const document = gql`
        mutation($input: AllocateIPAddressInput!) {
			allocateIpAddress(input: $input) {
				ipAddress {
					id
					address
					type
					region
					createdAt
				}
			}
		}
    `;

    const variables = {
        input: {
            appId: appName,
            type: "shared_v4"
        }
    }

    await fly.request(document, variables);
}