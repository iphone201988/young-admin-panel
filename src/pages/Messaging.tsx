import { motion } from "framer-motion";
import { MessageSquare, Send, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MessagingPanel from "@/components/messaging/MessagingPanel";
// import { useGetMessagesQuery } from "@/store/api";

export default function Messaging() {
  // const { data: messages = [] } = useGetMessagesQuery();
  const messages: any = [];

  // Calculate messaging statistics
  const totalMessages = messages.length;
  const bulkMessages = messages.filter((m) => m.isBulk).length;
  const individualMessages = messages.filter((m) => !m.isBulk).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Messages
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {totalMessages}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="text-blue-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Bulk Messages
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {bulkMessages}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="text-purple-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Individual Messages
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {individualMessages}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Send className="text-secondary" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messaging Panel */}
      <MessagingPanel />

      {/* Recent Messages */}
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">Recent Messages</h3>
          <p className="text-sm text-muted-foreground">
            View recently sent messages
          </p>
        </div>
        <div className="p-6">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No messages sent yet
              </h3>
              <p className="text-muted-foreground">
                Start by composing your first message using the form above.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.slice(0, 10).map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border border-border rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{message.subject}</h4>
                        {message.isBulk && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            <Users size={12} className="mr-1" />
                            Bulk
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {message.content.substring(0, 100)}...
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Sent on {new Date(message.sentAt).toLocaleDateString()}{" "}
                        at {new Date(message.sentAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
